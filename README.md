<div align="center">
  <p><img src="https://github.com/daitasu/tecco/blob/master/assets/tecco_logo.png" height="200" alt=""></p>
</div>

# tecco
teccoはVueプロジェクトでの、同名のvueファイル、testファイル、mixinファイルを一括生成するscaffoldです。

# 背景
Vue.jsを用いたプロジェクトなどにおいて、component設計をしていると、ユーザ権限の違い、
pc/mobileなどのuser agentの違いによってcomponentを分けることなどがよくあります。

その際、同じ名前で各ディレクトリ配下に同名のvueファイルやテストファイルを置く必要があり、場合によってはmixinファイルなども作成するために手間が発生します。

teccoは上記のような時に、設定ファイルに基づいて一括で `vue`ファイル、 `spec.js`、`minin` ファイルを生成してくれます。

