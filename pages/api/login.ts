import type { User } from './user'

import { Octokit } from 'octokit'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from 'lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
const octokit = new Octokit()

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {

  console.log("body: " + JSON.stringify(req.body));
  const { username, password } = await req.body
  console.log(`VAI AUTH ${username} - ${password}`);
  try {
    // const {
    //   data: { login, avatar_url },
    // } = await octokit.rest.users.getByUsername({ username })
    const URLAPI = 'http://192.168.50.30:9511';
    const url = `${URLAPI}/auth/oauth/token?Authorization=&grant_type=password&username=${username}&password=${password}`;
    let body = {};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "_usuario": "MTs3NUFMOA==",
        "Authorization": "Basic Y29udHJvbC11c2VyOkBycGFVc2VyI0NvbnRyb2wjMTM1"
      },
      body: JSON.stringify(body)
    };

    console.log('VAI AUTH: ' + url);
    console.log('VAI AUTH: ' + options);
    const response = await fetch(url, options);
    const tokenJson = await response.json();
    console.log(JSON.stringify(tokenJson));

    const user = { isLoggedIn: true, login: tokenJson.username, avatarUrl: 'https://avatars.githubusercontent.com/u/13109831?v=4' } as User
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({ message: (error as Error).message })
  }
}
