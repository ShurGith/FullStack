import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.1.1",
    tags: [
      {
        name: 'Products',
        description: 'API operations related to products'
      },
    ],
    info: {
      title: 'REST API Node.js / Express / TypeScript',
      version: '1.0.0',
      description: 'API Docs for Products'

    }
  },
  apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #18303fff;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript',
    customfavIcon: 'https://miro.medium.com/v2/resize:fill:96:96/1*U-kjsW7IZUobnoy1gAp1UQ.png'
}

export default swaggerSpec
export {
    swaggerUiOptions
}