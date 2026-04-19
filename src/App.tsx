import { useNavigate } from 'react-router-dom';
import { usePdiStore } from './store/usePdiStore';
import { WizardLayout } from './components/WizardLayout';
import { Passo1Causa } from './pages/Passo1Causa';
import { Passo2AutoAvaliacao } from './pages/Passo2AutoAvaliacao';
import { Passo3Objetivos } from './pages/Passo3Objetivos';
import { Passo4PlanoAcao } from './pages/Passo4PlanoAcao';
import { Passo5CampoForcas } from './pages/Passo5CampoForcas';
import { Passo6RevisaoFinal } from './pages/Passo6RevisaoFinal';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

function App() {
  const stepAtual    = usePdiStore(s => s.stepAtual);
  const setWizardConcluido = usePdiStore(s => s.setWizardConcluido);
  const navigate     = useNavigate();

  const handleConcluir = () => {
    setWizardConcluido(true);
    navigate('/', { replace: true });
  };

  const renderStep = () => {
    switch (stepAtual) {
      case 1: return <Passo1Causa />;
      case 2: return <Passo2AutoAvaliacao />;
      case 3: return <Passo3Objetivos />;
      case 4: return <Passo4PlanoAcao />;
      case 5: return <Passo5CampoForcas />;
      case 6: return <Passo6RevisaoFinal />;
      default: return <Passo1Causa />;
    }
  };

  return (
    <WizardLayout onConcluir={handleConcluir}>
      <AnimatePresence mode="wait">
        <motion.div
          key={stepAtual}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </WizardLayout>
  );
}

export default App;
