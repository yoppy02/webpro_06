"use strict";

const Email = document.querySelector('#email');
const Password = document.querySelector('#password');
const loginbutton = document.querySelector('#login');
const Output = document.querySelector('#comment');

// ログインボタンのクリックイベント
loginbutton.addEventListener('click', () => {
    const email = Email.value.trim();
    const password = Password.value.trim();

    // メールアドレスとパスワードが空の場合のエラーメッセージ
    if (!email || !password) {
        Output.textContent = 'メールアドレスとパスワードを入力してください。';
        return;
    }

    // パラメータの設定
    const params = new URLSearchParams();
    params.append('id', email);
    params.append('password', password);

    // ログインのリクエスト送信
    fetch('/login', {
        method: 'POST',
        body: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => {
            if (!response.ok) throw new Error('サーバーエラー');
            return response.json();
        })
        .then(data => {
            Output.textContent = data.message; // サーバーからのメッセージを表示

            if (data.message.startsWith("OK")) { // ログイン成功時の判定
                // ログイン成功時、3秒後に bbs.html へ遷移
                setTimeout(() => {
                    location.href = "bbs.html";
                }, 2000); // 2秒待機
            }

            // 入力フィールドをリセット
            Email.value = '';
            Password.value = '';
        })
        .catch(error => {
            console.error(error);
            Output.textContent = 'エラーが発生しました。もう一度お試しください。';
        });
});