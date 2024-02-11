import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = (credentials) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up',
		data: {
			credentials: {
				email: credentials.email,
				userName: credentials.userName,
				password: credentials.password,
				password_confirmation: credentials.passwordConfirmation,
			},
		},
	})
}

export const signIn = (credentials) => {
    let signInData = {
        credentials: {}
    };

    if (credentials.email) {
        signInData.credentials.email = credentials.email;
    } else if (credentials.userName) {
        signInData.credentials.userName = credentials.userName;
    }

    signInData.credentials.password = credentials.password;

    return axios({
        url: apiUrl + '/sign-in',
        method: 'POST',
        data: signInData
    });
};

export const signOut = (user) => {
	return axios({
		url: apiUrl + '/sign-out',
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const changePassword = (passwords, user) => {
	return axios({
		url: apiUrl + '/change-password',
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword,
			},
		},
	})
}
