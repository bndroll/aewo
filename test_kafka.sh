kcat -C \
         -b rc1a-b5e65f36lm3an1d5.mdb.yandexcloud.net:9091 \
         -t zsmk-9433-dev-01 \
         -X security.protocol=SASL_SSL \
         -X sasl.mechanisms=SCRAM-SHA-512 \
         -X sasl.username="9433_reader" \
         -X sasl.password="eUIpgWu0PWTJaTrjhjQD3.hoyhntiK" \
         -X ssl.ca.location=/usr/local/share/ca-certificates/Yandex/YandexCA.crt -Z -K: