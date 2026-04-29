FROM node:20

ARG TZ
ENV TZ="$TZ"

ARG CLAUDE_CODE_VERSION=latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    less \
    git \
    procps \
    sudo \
    fzf \
    unzip \
    gnupg2 \
    wget \
    apt-transport-https \
    gh \
    jq \
    ripgrep \
    python3 \
    python3-pip \
    maven \
    && wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public \
       | gpg --dearmor -o /usr/share/keyrings/adoptium.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/adoptium.gpg] https://packages.adoptium.net/artifactory/deb bookworm main" \
       > /etc/apt/sources.list.d/adoptium.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends temurin-21-jdk \
    && ln -s /usr/lib/jvm/temurin-21-jdk-$(dpkg --print-architecture) /usr/lib/jvm/temurin-21 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/temurin-21
ENV PATH=$PATH:$JAVA_HOME/bin

RUN mkdir -p /usr/local/share/npm-global && \
    chown -R node:node /usr/local/share

ENV DEVCONTAINER=true

RUN mkdir -p /workspace /home/node/.claude && \
    chown -R node:node /workspace /home/node/.claude

WORKDIR /workspace

USER node

ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin

ENV SHELL=/bin/bash

RUN npm install -g @anthropic-ai/claude-code@${CLAUDE_CODE_VERSION}

CMD ["/bin/bash"]
