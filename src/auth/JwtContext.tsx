import { createContext, useEffect, useReducer, useCallback } from 'react';
// utils
import axios from '../utils/axios';
//
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';
import { Login, checkToken, signUp } from 'src/services/auth/auth.service';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------
// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);
// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get('/api/account/my-account');

        // const response = await checkToken();

        const { user } = response?.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  //LOGIN;
  // const login = async (email: string, password: string) => {
  //   const response = await axios.post('/api/account/login', {
  //     email,
  //     password,
  //   });
  //   console.log(response);

  //   const { accessToken, user } = response.data;

  //   console.log('response.data', response.data);

  //   console.log(response);
  //   setSession(accessToken);

  //   dispatch({
  //     type: Types.LOGIN,
  //     payload: {
  //       user,
  //     },
  //   });
  // };

  const login = async (email: string, password: string) => {
    const userData = {
      email,
      password,
    };
    const response = await Login(userData);
    // if (response?.status === 201) {
    //   enqueueSnackbar('Login  Successfully !', { variant: 'success' });
    // } else {
    //   enqueueSnackbar('Unable to Login !', { variant: 'error' });
    // }

    const { accessToken, user } = response.data.user;

    setSession(accessToken);
    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  };

  // REGISTER
  // const register = async (email: string, password: string, firstName: string, lastName: string) => {
  //   const response = await axios.post('/api/account/register', {
  //     email,
  //     password,
  //     firstName,
  //     lastName,
  //   });
  //   const { accessToken, user } = response.data;

  //   localStorage.setItem('accessToken', accessToken);

  //   dispatch({
  //     type: Types.REGISTER,
  //     payload: {
  //       user,
  //     },
  //   });
  // };
  const register = async (signUpUser: any) => {
    const response = await signUp(signUpUser);

    const userData = response?.data;
    const user = { ...userData };
    const accessToken = userData?.accessToken;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user,
      },
    });
  };

  // LOGOUT
  const logout = async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        loginWithGoogle: () => {},
        loginWithGithub: () => {},
        loginWithTwitter: () => {},
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
