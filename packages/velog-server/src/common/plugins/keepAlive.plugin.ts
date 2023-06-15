import { FastifyPluginAsync } from "fastify";

let isClosing = false;
export const startClosing = () => {
  isClosing = true;
};

export const keepAlive: FastifyPluginAsync = async (fastify) => {
  fastify.addHook("preHandler", (_, reply, done) => {
    if (isClosing) {
      // http.send but nothing contents
      reply.send();
    }
    done();
  });
};
