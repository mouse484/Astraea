## [1.12.1](https://github.com/mouse484/astraea/compare/v1.12.0...v1.12.1) (2023-03-16)


### Bug Fixes

* 長いノートはその中でスクロールして表示 ([6bf2be1](https://github.com/mouse484/astraea/commit/6bf2be1c12210e60799a17c2334669b76a99f0ff)), closes [#91](https://github.com/mouse484/astraea/issues/91)

# [1.12.0](https://github.com/mouse484/astraea/compare/v1.11.5...v1.12.0) (2023-03-16)


### Bug Fixes

* noteのページ移動を一旦ダブルクリックに ([6b73ecb](https://github.com/mouse484/astraea/commit/6b73ecb9fe011cbdb159836b5ab40000b6d0e6c9)), closes [#198](https://github.com/mouse484/astraea/issues/198)
* ヘッダーの設定リンクのアイコンを変更 ([42f17fe](https://github.com/mouse484/astraea/commit/42f17fea126e59481c72578ee99eaf3901d49c2c))


### Features

* 小さい画面の場合通知は別ページにする ([6956195](https://github.com/mouse484/astraea/commit/6956195fd683a9d3cbddc87c4c6930655c091787))
* 通知欄の動作をリンクによって変える ([6721ea3](https://github.com/mouse484/astraea/commit/6721ea38693c5d87afbd73590163d0ecc97dd0c9)), closes [#193](https://github.com/mouse484/astraea/issues/193)

## [1.11.5](https://github.com/mouse484/astraea/compare/v1.11.4...v1.11.5) (2023-03-15)


### Bug Fixes

* eventが取得できなかったときの表示方法を変更 ([e2ec853](https://github.com/mouse484/astraea/commit/e2ec8536488b125bd9723e44a4f90336fea9f532))

## [1.11.4](https://github.com/mouse484/astraea/compare/v1.11.3...v1.11.4) (2023-03-15)


### Bug Fixes

* url(a tag)が長い場合折り返す ([79005b8](https://github.com/mouse484/astraea/commit/79005b8abc9bd1a3a709ca478d97c01c68801c59)), closes [#191](https://github.com/mouse484/astraea/issues/191)

## [1.11.3](https://github.com/mouse484/astraea/compare/v1.11.2...v1.11.3) (2023-03-15)


### Bug Fixes

* リアクションの数が多いときに折り返すように ([09283cd](https://github.com/mouse484/astraea/commit/09283cd34050dc951b757077fbed1cbcf1c6ba65))
* 文字が飛び出さないように ([b982b92](https://github.com/mouse484/astraea/commit/b982b92e2b05ced33b4782a3e574d896fde18cd5))

## [1.11.2](https://github.com/mouse484/astraea/compare/v1.11.1...v1.11.2) (2023-03-15)


### Bug Fixes

* プロフィールメニューのnpubとhexが逆になっていた ([2a077da](https://github.com/mouse484/astraea/commit/2a077da9e0f39aca9027dafb666db573c4dfbb87)), closes [#186](https://github.com/mouse484/astraea/issues/186)

## [1.11.1](https://github.com/mouse484/astraea/compare/v1.11.0...v1.11.1) (2023-03-15)


### Bug Fixes

* 挙動がおかしいのでsubscribeEventsは元に戻す ([4596f4d](https://github.com/mouse484/astraea/commit/4596f4df176c6189182c16afc3aae2467dee13cc))

# [1.11.0](https://github.com/mouse484/astraea/compare/v1.10.0...v1.11.0) (2023-03-15)


### Features

* イベントの取得方法を更新 ([36ecf68](https://github.com/mouse484/astraea/commit/36ecf68b5b11449d821652d630370699c11c89e7))
* 通信数を減らすためにTL取得時に見つからなかったリプ周りのnoteの取得を改善 ([eb1ec56](https://github.com/mouse484/astraea/commit/eb1ec56e86101181b99d96506dd64e714004f0b5))

# [1.10.0](https://github.com/mouse484/astraea/compare/v1.9.1...v1.10.0) (2023-03-15)


### Bug Fixes

* 通知欄の優先順位をプロフィールメニューより上にする ([0f7483c](https://github.com/mouse484/astraea/commit/0f7483c36da63de314ec9e8441615b7260c6b517))


### Features

* いいねされた通知ページを作成 ([b175f37](https://github.com/mouse484/astraea/commit/b175f37255035920ef7770c1881acb5e0472876c))
* ページ遷移したら通知欄を閉じる ([f02d987](https://github.com/mouse484/astraea/commit/f02d9876ddebe5ce3bf3abc48d0a99a24515b288))
* ヘッダーに通知ボタンを作成 ([cfe5dd2](https://github.com/mouse484/astraea/commit/cfe5dd2e47e53ea3e1894ea9960ea549b1b774a2))
* 通知のデザインを調整 ([6d5f308](https://github.com/mouse484/astraea/commit/6d5f3089fef08770181173d83a6b69dcb88af744))
* 通知の読み込み画面を実装 ([53fa537](https://github.com/mouse484/astraea/commit/53fa537f37f7ea68754d240d4b414e80698794f0))
* 通知ページをコンポーネント化 ([84da8e6](https://github.com/mouse484/astraea/commit/84da8e6d4e56dbcd5ff40fb63c7389d55728e871))

## [1.9.1](https://github.com/mouse484/astraea/compare/v1.9.0...v1.9.1) (2023-03-14)


### Bug Fixes

* **deps:** update dependency isomorphic-dompurify to ^1.2.0 ([5795e52](https://github.com/mouse484/astraea/commit/5795e5205fcaad6137310affa9fa8c4b61cd7491))

# [1.9.0](https://github.com/mouse484/astraea/compare/v1.8.1...v1.9.0) (2023-03-14)


### Features

* npubとhexのコピー機能 ([58acd6c](https://github.com/mouse484/astraea/commit/58acd6c7df33dd2284ddd52b73b1aacde2477967)), closes [#164](https://github.com/mouse484/astraea/issues/164)
* コピーした情報を見えるように ([d7f9e14](https://github.com/mouse484/astraea/commit/d7f9e145014efa12d7e0ed8784b13a48df0db957))
* プロフィールにメニューを作成 ([2927be6](https://github.com/mouse484/astraea/commit/2927be68b0e71b97d176c7aae6134188f8b726e6))

## [1.8.1](https://github.com/mouse484/astraea/compare/v1.8.0...v1.8.1) (2023-03-13)


### Bug Fixes

* semantic-releaseおかしい ([0d8ac19](https://github.com/mouse484/astraea/commit/0d8ac192f8ff4d4126f38666de73a9f1526f87bd))

# [1.8.0](https://github.com/mouse484/astraea/compare/v1.7.0...v1.8.0) (2023-03-13)


### Bug Fixes

* homeのデザインを調整 ([86f329f](https://github.com/mouse484/astraea/commit/86f329f6cb706ee0bee833f9ec57495eeb6ff516))
* noteへのlink ([667fe68](https://github.com/mouse484/astraea/commit/667fe68bc7f45520ae11c02fa0bef062ed5bf9aa))
* note内のリンク ([c0bcd31](https://github.com/mouse484/astraea/commit/c0bcd3193c0b54ca37ee6703fd011aec33be1050))
* unicode結合文字をはみ出ないように ([b8306eb](https://github.com/mouse484/astraea/commit/b8306eb9ee8da12747ca1874aacf38f633a0c918))
* 文字ずれるから修正 ([6064da0](https://github.com/mouse484/astraea/commit/6064da04d666e8adc6efcd4c9a29b03192718b0f))
* 画像リンクにクエリがついてたときに対応する正規表現に修正 ([ca9dfe3](https://github.com/mouse484/astraea/commit/ca9dfe3851858dd9d7dbf9c6ead2757cbfb13908))


### Features

* noteページ ([9232fdb](https://github.com/mouse484/astraea/commit/9232fdbe4a086ec8b53ab87d4663b1673b0c3e16))
* NoteをクリックしたらNoteページにいく ([260a53b](https://github.com/mouse484/astraea/commit/260a53b919560eafc47b2cf801897d123f0a16e9))
* タイムラインをリレーからeoseが帰ってから表示する ([29f74b2](https://github.com/mouse484/astraea/commit/29f74b253e7edc737ca74bef74b65b7f405bb82f))

# [1.8.0](https://github.com/mouse484/astraea/compare/v1.7.0...v1.8.0) (2023-03-13)


### Bug Fixes

* homeのデザインを調整 ([86f329f](https://github.com/mouse484/astraea/commit/86f329f6cb706ee0bee833f9ec57495eeb6ff516))
* unicode結合文字をはみ出ないように ([b8306eb](https://github.com/mouse484/astraea/commit/b8306eb9ee8da12747ca1874aacf38f633a0c918))
* 文字ずれるから修正 ([6064da0](https://github.com/mouse484/astraea/commit/6064da04d666e8adc6efcd4c9a29b03192718b0f))
* 画像リンクにクエリがついてたときに対応する正規表現に修正 ([ca9dfe3](https://github.com/mouse484/astraea/commit/ca9dfe3851858dd9d7dbf9c6ead2757cbfb13908))


### Features

* noteページ ([9232fdb](https://github.com/mouse484/astraea/commit/9232fdbe4a086ec8b53ab87d4663b1673b0c3e16))
* NoteをクリックしたらNoteページにいく ([260a53b](https://github.com/mouse484/astraea/commit/260a53b919560eafc47b2cf801897d123f0a16e9))
* タイムラインをリレーからeoseが帰ってから表示する ([29f74b2](https://github.com/mouse484/astraea/commit/29f74b253e7edc737ca74bef74b65b7f405bb82f))

# [1.8.0](https://github.com/mouse484/astraea/compare/v1.7.0...v1.8.0) (2023-03-13)


### Bug Fixes

* homeのデザインを調整 ([86f329f](https://github.com/mouse484/astraea/commit/86f329f6cb706ee0bee833f9ec57495eeb6ff516))
* unicode結合文字をはみ出ないように ([b8306eb](https://github.com/mouse484/astraea/commit/b8306eb9ee8da12747ca1874aacf38f633a0c918))
* 文字ずれるから修正 ([6064da0](https://github.com/mouse484/astraea/commit/6064da04d666e8adc6efcd4c9a29b03192718b0f))
* 画像リンクにクエリがついてたときに対応する正規表現に修正 ([ca9dfe3](https://github.com/mouse484/astraea/commit/ca9dfe3851858dd9d7dbf9c6ead2757cbfb13908))


### Features

* タイムラインをリレーからeoseが帰ってから表示する ([29f74b2](https://github.com/mouse484/astraea/commit/29f74b253e7edc737ca74bef74b65b7f405bb82f))

# [1.8.0](https://github.com/mouse484/astraea/compare/v1.7.0...v1.8.0) (2023-03-13)


### Bug Fixes

* homeのデザインを調整 ([86f329f](https://github.com/mouse484/astraea/commit/86f329f6cb706ee0bee833f9ec57495eeb6ff516))
* unicode結合文字をはみ出ないように ([b8306eb](https://github.com/mouse484/astraea/commit/b8306eb9ee8da12747ca1874aacf38f633a0c918))
* 画像リンクにクエリがついてたときに対応する正規表現に修正 ([ca9dfe3](https://github.com/mouse484/astraea/commit/ca9dfe3851858dd9d7dbf9c6ead2757cbfb13908))


### Features

* タイムラインをリレーからeoseが帰ってから表示する ([29f74b2](https://github.com/mouse484/astraea/commit/29f74b253e7edc737ca74bef74b65b7f405bb82f))

# [1.8.0](https://github.com/mouse484/astraea/compare/v1.7.0...v1.8.0) (2023-03-13)


### Bug Fixes

* homeのデザインを調整 ([86f329f](https://github.com/mouse484/astraea/commit/86f329f6cb706ee0bee833f9ec57495eeb6ff516))
* 画像リンクにクエリがついてたときに対応する正規表現に修正 ([ca9dfe3](https://github.com/mouse484/astraea/commit/ca9dfe3851858dd9d7dbf9c6ead2757cbfb13908))


### Features

* タイムラインをリレーからeoseが帰ってから表示する ([29f74b2](https://github.com/mouse484/astraea/commit/29f74b253e7edc737ca74bef74b65b7f405bb82f))

# [1.8.0](https://github.com/mouse484/astraea/compare/v1.7.0...v1.8.0) (2023-03-13)


### Bug Fixes

* homeのデザインを調整 ([86f329f](https://github.com/mouse484/astraea/commit/86f329f6cb706ee0bee833f9ec57495eeb6ff516))


### Features

* タイムラインをリレーからeoseが帰ってから表示する ([29f74b2](https://github.com/mouse484/astraea/commit/29f74b253e7edc737ca74bef74b65b7f405bb82f))

# [1.7.0](https://github.com/mouse484/astraea/compare/v1.6.1...v1.7.0) (2023-03-13)


### Features

* リレー情報を表示 ([827a842](https://github.com/mouse484/astraea/commit/827a842e3e27e9100f702413cdd2028b4426ff4a))

## [1.6.1](https://github.com/mouse484/astraea/compare/v1.6.0...v1.6.1) (2023-03-13)


### Bug Fixes

* リプライにフィルターのpubkeyが含まれている場合も表示する ([e0d57c3](https://github.com/mouse484/astraea/commit/e0d57c3d36bbfb6a52a1966d6188ec3002dc9c72))

# [1.6.0](https://github.com/mouse484/astraea/compare/v1.5.2...v1.6.0) (2023-03-12)


### Features

* kind1 Event周りの改善 ([e87ae7a](https://github.com/mouse484/astraea/commit/e87ae7a89479a29ba4a686351defc42c82897852))
* notesの更新をしやすく ([dc004ba](https://github.com/mouse484/astraea/commit/dc004bad31f9d8c39f2eac06b9253da2f0fabfe6))
* リプ元が表示できないときにidを表示（仮） ([c5e3ed7](https://github.com/mouse484/astraea/commit/c5e3ed7f237dd00ef4e898a43d9f8bb030be47cb))
* 指定されたauthorの投稿のフィルターをしてから表示 ([6bec6c5](https://github.com/mouse484/astraea/commit/6bec6c5a41ea72c2385e783003f02ff6d6f62454))

## [1.5.2](https://github.com/mouse484/astraea/compare/v1.5.1...v1.5.2) (2023-03-12)


### Bug Fixes

* プロフィールのバナー画像のサイズを修正 ([04d80f6](https://github.com/mouse484/astraea/commit/04d80f6d2a1d7b5b97d8c935a427eef372251b81))

## [1.5.1](https://github.com/mouse484/astraea/compare/v1.5.0...v1.5.1) (2023-03-12)


### Bug Fixes

* 返信した後に入力欄隠す ([9f34a61](https://github.com/mouse484/astraea/commit/9f34a61df3d1513e489b8edca2323e3e2ad44aa6))

# [1.5.0](https://github.com/mouse484/astraea/compare/v1.4.0...v1.5.0) (2023-03-12)


### Features

* いいね機能 ([a917b6a](https://github.com/mouse484/astraea/commit/a917b6aa33a0cf3628ee69b10914fe570628d40a))

# [1.4.0](https://github.com/mouse484/astraea/compare/v1.3.0...v1.4.0) (2023-03-12)


### Features

* 返信機能 ([ca6ccd0](https://github.com/mouse484/astraea/commit/ca6ccd0e98482c67aab9389a20e03e6e2328f417))

# [1.3.0](https://github.com/mouse484/astraea/compare/v1.2.1...v1.3.0) (2023-03-12)


### Features

* ボタンコンポーネントを作成 ([26bae31](https://github.com/mouse484/astraea/commit/26bae31b3bd0dc56195dd841e5caee687930cb75))
* ボタンコンポーネントを適応 ([7892d83](https://github.com/mouse484/astraea/commit/7892d839e05f7882bdc715d0b29c9f5703a156f8))

## [1.2.1](https://github.com/mouse484/astraea/compare/v1.2.0...v1.2.1) (2023-03-12)


### Bug Fixes

* ctrl+enterで送信 ([f9d3918](https://github.com/mouse484/astraea/commit/f9d3918ec974d81d329b8b6a72b20ad5f1ec6906))

# [1.2.0](https://github.com/mouse484/astraea/compare/v1.1.1...v1.2.0) (2023-03-12)


### Bug Fixes

* 投稿時にpubkeyを取得しないでいい ([4f65af3](https://github.com/mouse484/astraea/commit/4f65af385f30663aa8ab9b7af317a9cab48d2611))


### Features

* マウントされてから表示する ([293e3df](https://github.com/mouse484/astraea/commit/293e3df7112580ce88366f04d2ab1a35c80cc910))
* ログアウト ([07a515a](https://github.com/mouse484/astraea/commit/07a515a9bdd1234d09d90b14babb9dc6cbb3661f))
* ログイン後に遷移する必要がないので辞める ([a952e8f](https://github.com/mouse484/astraea/commit/a952e8fbb86a48f4414eb0458be5639902ccfb40))
* ログイン機能 ([9214d89](https://github.com/mouse484/astraea/commit/9214d890d6fd0421f8475fe2abdc38d45d406a13))
* 設定ページからpubkeyを変更する必要がなくなったので削除 ([be29b76](https://github.com/mouse484/astraea/commit/be29b760d64870ecd31639974ef6062be42a035a))

## [1.1.1](https://github.com/mouse484/astraea/compare/v1.1.0...v1.1.1) (2023-03-11)


### Bug Fixes

* **deps:** update dependency ws to ^8.13.0 ([c08d680](https://github.com/mouse484/astraea/commit/c08d6808bbaa4f170b4b37d6c735828b84346c55))

# [1.1.0](https://github.com/mouse484/astraea/compare/v1.0.0...v1.1.0) (2023-03-11)


### Bug Fixes

* 型がうまくついていなかった ([1f443c1](https://github.com/mouse484/astraea/commit/1f443c15c46a1e47768cdc258b90aafc298a694a))


### Features

* versionを表示 ([d834d69](https://github.com/mouse484/astraea/commit/d834d69f7c577ef741758dc1b6f1c23f2cb20452))

# 1.0.0 (2023-03-11)


### Bug Fixes

* cotentが抜けないようにする ([4c27332](https://github.com/mouse484/astraea/commit/4c273328cd3bd08ab078172105fdd56f0b39bbce))
* **deps:** update dependency isomorphic-dompurify to ^1.1.0 ([d1994fa](https://github.com/mouse484/astraea/commit/d1994fa4d544eeafd06a4fb5b84985094fadaffb))
* **deps:** update dependency nostr-tools to ^1.3.2 ([28fc652](https://github.com/mouse484/astraea/commit/28fc652d8d8a39cee00f5244086a43daf8e88bce))
* **deps:** update dependency nostr-tools to ^1.4.1 ([3950676](https://github.com/mouse484/astraea/commit/3950676dacfdd721cbccbabd111a65721e51219c))
* **deps:** update dependency nostr-tools to ^1.4.2 ([6f14d82](https://github.com/mouse484/astraea/commit/6f14d82db0811fe9d18797a562bd4cfb929e8831))
* **deps:** update dependency nostr-tools to ^1.5.0 ([e4c2dba](https://github.com/mouse484/astraea/commit/e4c2dba7061ecc9acb0c80326a39244f3cfc4e01))
* **deps:** update dependency nostr-tools to ^1.6.0 ([#25](https://github.com/mouse484/astraea/issues/25)) ([40004db](https://github.com/mouse484/astraea/commit/40004dbc04555c76883a45ee306624adadfffea7))
* **deps:** update dependency nostr-tools to ^1.6.1 ([3180a9f](https://github.com/mouse484/astraea/commit/3180a9f8c94640a114376f0d1fd54782fe736616))
* **deps:** update dependency nostr-tools to ^1.7.1 ([5860c1b](https://github.com/mouse484/astraea/commit/5860c1bec74cb7cacc8e178bad52aebe0e6bdffd))
* **deps:** update dependency nostr-tools to ^1.7.4 ([e0171b2](https://github.com/mouse484/astraea/commit/e0171b2903fdf1a07108d28454c21ad6d902f05b))
* **deps:** update dependency ws to ^8.12.1 ([d8dc549](https://github.com/mouse484/astraea/commit/d8dc5496c2ce5a04bce6152cf072a5d95e9c56a8))


### Features

* 切り替えられるように ([a074c5b](https://github.com/mouse484/astraea/commit/a074c5b7a53a4ee2ccea773c72af6e19fc18b987))
