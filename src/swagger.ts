import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Organizational Hierarchy')
  .setDescription(
    'Employee management API where you can create, update, delete, and read positions/employees/authenticate',
  )
  .setVersion('1.0')
  .addTag('authentication')
  .addTag('employees')
  .addTag('positions')
  .build();

const theme = new SwaggerTheme('v3');
export const swaggerOptions = {
  customSiteTitle: 'Organizational Hierarchy',
  customCss: `
      ${theme.getBuffer}
      .topbar-wrapper img { content: url('./image.jpg'); width:190px; height:auto;}
      .swagger-ui .topbar { background-color: #57f146; }
    `,
};
