# 使用官方Node.js镜像作为基础镜像
FROM node:16

# 设置工作目录
WORKDIR /app

# 安装app依赖
COPY package*.json ./
RUN npm install

# 将源代码复制到工作目录
COPY . .

# 构建React应用
RUN npm run build

# 使用nginx来部署静态资源
FROM nginx:1.21
COPY --from=0 /app/dist /usr/share/nginx/html

# 用nginx的默认配置即可
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
