#!/bin/bash

# nuxt-pro 1.1.0

FIND_FILE="./package.json"
FIND_STR="@nuxt/ui-pro"
# 判断匹配函数，匹配函数不为0，则包含给定字符
if [ `grep -c "$FIND_STR" $FIND_FILE` -ne '0' ];then

    echo "找到UI-PRO，开始删除"
    # sed -n  '/build:before/=' ./node_modules/@nuxt/ui-pro/modules/pro/index.ts
    FIND_FILE="./node_modules/@nuxt/ui-pro/modules/pro/index.ts"
    FIND_STR="build:before"
    # 判断匹配函数，匹配函数不为0，则包含给定字符
    if [ `grep -c "$FIND_STR" $FIND_FILE` -ne '0' ];then
        echo "找到build:before，开始删除"
        sed -i 's/build:before/world/g' ./node_modules/@nuxt/ui-pro/modules/pro/index.ts
        exit 0
    fi
    exit 0
fi


