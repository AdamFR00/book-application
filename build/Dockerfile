# Frontend Angular build
FROM node:22 AS frontend-build

WORKDIR /frontend

COPY frontend/book-app/package*.json ./
RUN npm ci

COPY frontend/book-app/ ./
RUN npm run build


# Backend 
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-build

WORKDIR /src

COPY backend/BookApi/BookApi.csproj ./
RUN dotnet restore

COPY backend/BookApi/ ./

RUN dotnet publish -c Release -o /app/publish

# Final build 
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

WORKDIR /app

COPY --from=backend-build /app/publish ./

COPY --from=frontend-build /frontend/dist/book-app/browser ./wwwroot

EXPOSE 10000

ENV ASPNETCORE_HTTP_PORTS=10000

ENTRYPOINT [ "dotnet", "BookApi.dll" ]

