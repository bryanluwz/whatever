import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppLayout } from './components/AppLayout';
import { ColorMemoryPage } from './features/ColorMemory/ColorMemoryPage';

const App = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='color-memory' element={<ColorMemoryPage />} />
      </Route>

      <Route path='*' element={<Navigate to='/color-memory' replace />} />
    </Routes>
  );
};

export default App;
