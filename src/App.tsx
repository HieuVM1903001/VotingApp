import { useAppDispatch, useAppSelector } from './app/hooks';
import { getAllUsers, setUser } from './reducer/userSlice';
import { LoginPage } from './page/LoginPage';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
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
  showError: () => void;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated, showError }) => {

  useEffect(() => {
    if (!isAuthenticated) {
      showError();
    }
  }, [isAuthenticated, showError]);

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const { Sider, Content } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(['login'])
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllQuestions());
  }, [dispatch]);

  const user = useAppSelector((state) => state.user.authedUser);

  const logOut = () => {
    dispatch(setUser(undefined));
    navigate('/');
    setSelectedPage(['login'])
  };
  const backHome = () => {
    navigate('/home')
    setSelectedPage(['home'])
  }
  const addPage = () => {
    setSelectedPage(['add'])
    navigate('/add')
  }
  const leaderBoardPage = () => {
    navigate('/leaderboard')
    setSelectedPage(['leaderboard'])

  }
  const login = () => {
    navigate("/")
    setSelectedPage(['login'])
  }
  const error = () => {
    setSelectedPage(['login'])
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
            selectedKeys={selectedPage}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="home" onClick={backHome}>Home</Menu.Item>
            <Menu.Item key="add" onClick={addPage}>Add Question</Menu.Item>
            <Menu.Item key="leaderboard" onClick={leaderBoardPage}>Leaderboard</Menu.Item>
            {user && (
              <Menu.Item key="logout" onClick={logOut}>Logout</Menu.Item>
            )}
            {!user && (
              <Menu.Item key="login" onClick={login}>Login</Menu.Item>
            )}

          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: '20px', margin: 0, minHeight: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<PrivateRoute children={<MainPage />} isAuthenticated={!!user} showError={error} />} />
              <Route path="/questions/:questionId" element={<PrivateRoute children={<DetailQuestionPage />} isAuthenticated={!!user} showError={error} />} />
              <Route path="/add" element={<PrivateRoute children={<CreateQuestionPage />} isAuthenticated={!!user} showError={error} />} />
              <Route path="/leaderboard" element={<PrivateRoute children={<LeaderBoardPage />} isAuthenticated={!!user} showError={error} />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
