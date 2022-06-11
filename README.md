## API Endpoint
**User**
|Endpoint|Method|Body|
|-------|:----:|:---:|
|`/user/register`|`POST`|`nama`, `email`, `username`, `password`, `confirm_password`|
|`/user/login`|`POST`|`usernameEmail`,`password`|
|`/user/{id_user}`|`PUT`|`nama`, `email`, `username`|
|`/user/change-pw/{id_user}`|`PUT`|`password`, ` confirm_password`|
|`/user/forgot`|`POST`|`email`|
|`/user/{id_user}/{token}`|`POST`|`password`|


**Bayi**
|Endpoint|Method|Body|
|-------|:----:|:---:|
|`/bayi`|`POST`|`nama`,`tglLahir`, `bb_bayi`|
|`/bayi`|`GET`|`None`|
|`/bayi/{id_bayi}`|`PUT`|`nama`,`tglLahir`,`jk_bayi`, `bb_bayi`|
|`/bayi/{id_bayi}`|`GET`|`None`|
|`/bayi/{id_bayi}`|`DELETE`|`None`|
|`/bayi/{id_bayi}/bahan`|`PUT`|`alergi:`, `Roti_Tawar`, `Cumi_Cumi`, `Tepung_Beras`, `Pisang`, `Telur_Bebek`, `Kacang_Tanah`, `Kerang`, `Alpukat`|

## Resource
In our project is divided into three branches.
1. [Android-development](https://github.com/tezaalfian/simpasi-capstone-bangkit-2022)
2. [Cloud-computing](https://github.com/narikub/simpasi-capstone)
3. [Machine-learning](https://github.com/ayuadmy/simpasi)
