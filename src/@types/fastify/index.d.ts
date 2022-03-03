import { ReadUserDto } from '../../users/dto/read-user.dto';

/**
 * using declaration merging,
 * add your props(user) to the appropriate fastify interfaces.
 */
declare module 'fastify' {
  interface FastifyRequest {
    user: ReadUserDto;
  }
}
