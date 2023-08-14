import * as aws from '@pulumi/aws'
import { withPrefix } from '../lib/prefix'
import { ENV } from '../../env'
import { Input } from '@pulumi/pulumi'

export const createSecurityGroup = (vpcId: Input<string>, type: 'web' | 'server') => {
  const elbSecurityGroupName = withPrefix(`${type}-elb-sg`)
  const elbSecurityGroup = new aws.ec2.SecurityGroup(elbSecurityGroupName, {
    vpcId,
    description: 'Allow traffic from the internet',
    ingress: [
      {
        fromPort: 80,
        toPort: 80,
        protocol: 'tcp',
        cidrBlocks: ['0.0.0.0/0'],
      },
      {
        fromPort: 443,
        toPort: 443,
        protocol: 'tcp',
        cidrBlocks: ['0.0.0.0/0'],
      },
    ],
    egress: [
      {
        fromPort: 0,
        toPort: 0,
        protocol: '-1',
        cidrBlocks: ['0.0.0.0/0'],
      },
    ],
    tags: {
      Name: elbSecurityGroupName,
    },
  })

  const taskSecurityGroupName = withPrefix(`${type}-task-sg`)
  const portMapper = {
    web: ENV.webPort,
    server: ENV.serverPort,
  }

  const port = portMapper[type]
  const taskSecurityGroup = new aws.ec2.SecurityGroup(taskSecurityGroupName, {
    vpcId,
    description: 'Allow traffic from the load balancer',
    ingress: [
      {
        fromPort: port,
        toPort: port,
        protocol: 'tcp',
        securityGroups: [elbSecurityGroup.id],
      },
    ],
    egress: [
      {
        fromPort: 0,
        toPort: 0,
        protocol: '-1',
        cidrBlocks: ['0.0.0.0/0'],
      },
    ],
    tags: {
      Name: taskSecurityGroupName,
    },
  })

  return { elbSecurityGroup, taskSecurityGroup }
}