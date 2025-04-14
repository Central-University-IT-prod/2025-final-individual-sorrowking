import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFoundPage,
         CataloguePage, 
         TrainingConstructorPage, 
         SavedTrainingsPage, 
         ProfilePage, 
         AvatarPage,
         TrainingPage,
         VisitPage} from '@/pages'
import { MainLayout } from './layouts';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { useInitializeExercises } from './shared/hooks/useInitializeExercises';

const App = () => {
  useInitializeExercises();  // ! хук для инициализации упражнений при входе юзера
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VisitPage />} />
        <Route element={<MainLayout />}>
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/training-constructor" element={<TrainingConstructorPage />}/>
          <Route path="/saved-trainings" element={<SavedTrainingsPage />}/> 
          <Route path="/training" element={<TrainingPage />}/>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/character" element={<AvatarPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>

  );
};

export default App;