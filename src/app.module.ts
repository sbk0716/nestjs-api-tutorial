/**
 * app.module.ts
 * The root module of the application.
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { StatusModule } from './status/status.module';
import configuration from './config/configuration';

@Module({
  /**
   * ModuleMetadata | imports
   * Optional list of imported modules that export the providers
   * which are required in this module.
   * @see https://docs.nestjs.com/techniques/database#typeorm-integration
   */
  imports: [
    /**
     * ConfigModule.forRoot()
     * Load process environment variables depending on the "envFilePath" value.
     * Register custom configurations globally.
     * @see https://docs.nestjs.com/techniques/configuration
     */
    ConfigModule.forRoot({
      // isGlobal: If "true", registers ConfigModule as a global module.
      isGlobal: true,
      // envFilePath: Path to the environment file(s) to be loaded.
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,
        `.env`,
      ],
      // load: Array of custom configuration files to be loaded.
      load: [configuration],
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
    StatusModule,
  ],
})
export class AppModule {}
