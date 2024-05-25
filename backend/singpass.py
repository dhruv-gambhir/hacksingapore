from flask import Flask, redirect, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CLIENT_ID = os.getenv('SINGPASS_CLIENT_ID')
CLIENT_SECRET = os.getenv('SINGPASS_CLIENT_SECRET')
REDIRECT_URI = os.getenv('REDIRECT_URI')
TOKEN_ENDPOINT = 'https://oauth.singpass.gov.sg/token'
USERINFO_ENDPOINT = 'https://api.singpass.gov.sg/userinfo'

@app.route('/login')
def login():
    authorization_url = f'https://oauth.singpass.gov.sg/authorize?response_type=code&client_id={CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=openid'
    return redirect(authorization_url)

@app.route('/callback')
def callback():
    code = request.args.get('code')
    token_response = requests.post(TOKEN_ENDPOINT, data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    })

    token_response_data = token_response.json()
    access_token = token_response_data.get('access_token')

    userinfo_response = requests.get(USERINFO_ENDPOINT, headers={
        'Authorization': f'Bearer {access_token}'
    })

    userinfo_data = userinfo_response.json()
    return jsonify(userinfo_data)

if __name__ == '__main__':
    app.run(port=5000)
