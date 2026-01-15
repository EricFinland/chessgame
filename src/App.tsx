// ...existing code...
import './App.css'
import { ChessBoard } from './components/ChessBoard';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0d9b5 0%, #b58863 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, Arial, sans-serif',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        padding: '32px 48px',
        marginBottom: 32,
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '2.5em',
          fontWeight: 700,
          color: '#b58863',
          margin: 0,
          letterSpacing: '2px',
        }}>Funny Chess Game</h1>
        <p style={{ fontSize: '1.1em', color: '#444', marginTop: 12 }}>
          Play chess with wild animations against a simple bot!
        </p>
      </div>
      <ChessBoard />
      <p style={{ marginTop: 32, color: '#333', fontSize: '1em', background: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: '8px 16px' }}>
        Click a piece to move. Green squares show valid moves.<br />Yellow = selected piece.<br />Aqua = valid move.<br />Enjoy the chaos!
      </p>
    </div>
  );
}

export default App
