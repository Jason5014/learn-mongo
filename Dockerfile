# 指定基础镜像 从 node:16 构建
FROM node:16
# 创建项目运行目录
RUN mkdir -p /usr/src/app
# 指定工作区，后续指令都将在这个工作区完成
WORKDIR /usr/src/app
# 将文件拷贝到容器中
COPY server.js ./
# 指定 3000 端口
EXPOSE 3000
# 执行启动命令
CMD node server.js