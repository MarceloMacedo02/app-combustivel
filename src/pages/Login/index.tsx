import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useState ,useContext, useEffect} from 'react';
import { requestBackendLogin } from '../../util/requests'; 
import { getTokenData } from '../../util/auth';
import { AuthContext } from '../../AuthContext'; 
import { saveAuthData } from '../../util/storage';

type CredentialsDTO = {
  username: string;
  password: string;
};
function Login() {
  const { setAuthContextData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    //removeAuthData();   
  }, [])

  return (
    <>
      <Helmet>
        <title>Login |  </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm" style={{ marginTop: '20px', padding: '5px', textAlign: 'center' }}>


          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values:CredentialsDTO) => {
              console.log(values);
              
              requestBackendLogin(values)
              .then(
                (response) => {
                  console.log(response.data);
                  navigate('/app', { replace: true });
                saveAuthData(response.data);
                setHasError(false);
                setAuthContextData({
                  authenticated: true,
                  tokenData: getTokenData(),
                })
              
              })
              .catch((error) => {
                setHasError(true);
                console.log('ERRO', error);
              });
           
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Acesso
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Faça login na plataforma interna
                  </Typography>

                </Box>
                {hasError && (
                  <Alert severity="error">Erro ao tentar efetuar o login</Alert>
                )}
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >

                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >

                  </Grid>
                </Grid>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >

                </Box>
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Email Address"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary" 
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>

              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
