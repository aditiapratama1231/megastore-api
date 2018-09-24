import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const domainHost = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;

  //init swagger builder
  const swaggerOptions = new DocumentBuilder()
        .setTitle('Megastore')
        .setDescription('Megastore API Documentation')
        .setVersion('1.0')
        .setHost(domainHost.split('//')[1])
        .setSchemes(AppModule.isDev ? 'http' : 'https')
        .setBasePath('/api')
        .addBearerAuth('Authorization', 'header')
        .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  
  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(swaggerDocument);
  });

  SwaggerModule.setup('api', app, null, {
      swaggerUrl: `${domainHost}/api/docs/swagger.json`,
      explorer: true,
      swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true
      }
  });

  app.setGlobalPrefix('api');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(AppModule.port);
}
bootstrap();
