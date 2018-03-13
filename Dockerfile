FROM node:latest


ENV APP_ROOT /node-perf

RUN apt-get update
RUN apt-get install -y git
RUN git clone https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
RUN apt-get install -y build-essential flex bison curl sudo apt-utils vim
RUN cd linux/tools/perf/ && make all && cp perf /usr/bin/ && /usr/bin/perf -h


RUN apt-get install -y nodejs

COPY ./package.json ./package-lock.json /
RUN npm install --silent

COPY ./app/*.js /app/
COPY ./services/logger/ /services/logger


EXPOSE 3000
ENTRYPOINT ["npm", "run"]
CMD ["start"]
SHELL ["/bin/bash", "-c"]