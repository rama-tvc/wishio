import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Wishio API Documentation",
        version: "1.0.0",
        description: "Documentation for the Wishio API",
      },
      components: {
        securitySchemes: {
          NextAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ NextAuth: [] }],
    },
  });
  return spec;
};
