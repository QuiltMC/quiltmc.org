#!/bin/bash

set -e

GAMEVSN_URL="https://meta.fabricmc.net/v1/versions/game"
LOADER_URL="https://meta.fabricmc.net/v1/versions/loader/"
OUT_DIR="src/test-data/"
VSN_FILE="${OUT_DIR}game-versions.json"

mkdir -p "$OUT_DIR"
curl "$GAMEVSN_URL" > "$VSN_FILE"

while read vsn; do
    vsn="${vsn%\"}"
    vsn="${vsn#\"}"
    echo "Downloading data for $vsn"

    outfile="${OUT_DIR}${vsn}.json"
    echo "---" > "${outfile}"
    echo "---" >> "${outfile}"
    curl "$LOADER_URL$vsn" >> "${outfile}"
done < <(cat "$VSN_FILE" | jq '.[] | .version')

