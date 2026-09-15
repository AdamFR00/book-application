# Angular
FROM node:22-apline AS frontend-build

WORKDIR /frontend

COPY frontend/book-app/package*json ./
RUN npm ci

COPY frontend/book-app/ ./
RUN npm run build

# ASP.NET CORE
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

COPY *.csproj ./
RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o /app/publish

# Final
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

WORKDIR /app

COPY --from=backend-build /app/publish ./

COPY --from=frontend-build /frontend/dist/book-app/browser ./wwwroot

EXPOSE 10000

ENV ASPNETCORE_URLS=http://+:10000
ENTRYPOINT ["dotnet", "BookApi.dll"]