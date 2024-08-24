import { useAppDispatch, useAppSelector } from './app/hooks';
import { getAllUsers, setUser } from './reducer/userSlice';
import { LoginPage } from './page/LoginPage';
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { MainPage } from './page/MainPage';
import { Layout, Menu, message } from 'antd';
import { useEffect, useState } from 'react';
import { getAllQuestions } from './reducer/questionSlice';
import { DetailQuestionPage } from './page/DetailQuestionPage';
import { CreateQuestionPage } from './page/CreateQuestionPage';
import { LeaderBoardPage } from './page/LeaderBoardPage';

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  showError: (path: string) => void;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated, showError }) => {
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      showError(location.pathname);
    }
  }, [isAuthenticated, location.pathname, showError]);

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllQuestions());
  }, [dispatch]);

  const user = useAppSelector((state) => state.user.authedUser);

  const logOut = () => {
    dispatch(setUser(undefined));
    navigate('/');
    setRedirectPath(null);
  };

  const error = (path: string) => {
    setRedirectPath(path); // Save the path user attempted to access
    console.log({path})
    messageApi.open({
      type: 'error',
      content: 'Please login first!',
    });
  };

  return (
    <div className="App">
      {contextHolder}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[""]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="home" onClick={() => navigate('/home')}>Home</Menu.Item>
            <Menu.Item key="add" onClick={() => navigate('/add')}>Add Question</Menu.Item>
            <Menu.Item key="leaderboard" onClick={() => navigate('/leaderboard')}>Leaderboard</Menu.Item>
            {user && (
              <Menu.Item key="logout" onClick={logOut}>Logout</Menu.Item>
            )}
            {!user && (
              <Menu.Item key="login" onClick={() => navigate('/')}>Login</Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: '20px', margin: 0, minHeight: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/" element={<LoginPage redirectPath={redirectPath} />} />
              <Route path="/home" element={<PrivateRoute isAuthenticated={!!user} showError={error}><MainPage /></PrivateRoute>} />
              <Route path="/questions/:questionId" element={<DetailQuestionPage />} />
              <Route path="/add" element={<PrivateRoute isAuthenticated={!!user} showError={error}><CreateQuestionPage /></PrivateRoute>} />
              <Route path="/leaderboard" element={<PrivateRoute isAuthenticated={!!user} showError={error}><LeaderBoardPage /></PrivateRoute>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
