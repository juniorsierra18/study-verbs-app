import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const regularVerbs = [
  { spanish: "Llamar", english: "Call", pastParticiple: "Called" },
  { spanish: "Cambiar", english: "Change", pastParticiple: "Changed" },
  { spanish: "Vivir", english: "Live", pastParticiple: "Lived" },
  { spanish: "Mirar", english: "Look", pastParticiple: "Looked" },
  { spanish: "Mover", english: "Move", pastParticiple: "Moved" },
  { spanish: "Estudiar", english: "Study", pastParticiple: "Studied" },
  { spanish: "Hablar", english: "Talk", pastParticiple: "Talked" },
  { spanish: "Intentar", english: "Try", pastParticiple: "Tried" },
  { spanish: "Usar", english: "Use", pastParticiple: "Used" },
  { spanish: "Desear", english: "Want", pastParticiple: "Wanted" },
  { spanish: "Trabajar", english: "Work", pastParticiple: "Worked" },
  { spanish: "Jugar", english: "Play", pastParticiple: "Played" },
];

const irregularVerbs = [
  { spanish: "Ser/Estar", english: "Be", pastParticiple: "Been" },
  { spanish: "Convertirse", english: "Become", pastParticiple: "Become" },
  { spanish: "Comenzar", english: "Begin", pastParticiple: "Begun" },
  { spanish: "Venir", english: "Come", pastParticiple: "Come" },
  { spanish: "Hacer", english: "Do", pastParticiple: "Done" },
  { spanish: "Beber", english: "Drink", pastParticiple: "Drunk" },
  { spanish: "Encontrar", english: "Find", pastParticiple: "Found" },
  { spanish: "Obtener", english: "Get", pastParticiple: "Gotten" },
  { spanish: "Dar", english: "Give", pastParticiple: "Given" },
  { spanish: "Ir", english: "Go", pastParticiple: "Gone" },
  { spanish: "Tener", english: "Have", pastParticiple: "Had" },
  { spanish: "Saber/Conocer", english: "Know", pastParticiple: "Known" },
  { spanish: "Dejar", english: "Leave", pastParticiple: "Left" },
  { spanish: "Hacer", english: "Make", pastParticiple: "Made" },
  { spanish: "Poner", english: "Put", pastParticiple: "Put" },
  { spanish: "Leer", english: "Read", pastParticiple: "Read" },
  { spanish: "Decir", english: "Say", pastParticiple: "Said" },
  { spanish: "Ver", english: "See", pastParticiple: "Seen" },
  { spanish: "Dormir", english: "Sleep", pastParticiple: "Slept" },
  { spanish: "Hablar", english: "Speak", pastParticiple: "Spoken" },
  { spanish: "Tomar", english: "Take", pastParticiple: "Taken" },
  { spanish: "Decir", english: "Tell", pastParticiple: "Told" },
  { spanish: "Pensar", english: "Think", pastParticiple: "Thought" },
  { spanish: "Escribir", english: "Write", pastParticiple: "Written" },
  { spanish: "Comer", english: "Eat", pastParticiple: "Eaten" },
  { spanish: "Soplar", english: "Blow", pastParticiple: "Blown" },
  { spanish: "Romper", english: "Break", pastParticiple: "Broken" },
  { spanish: "Traer", english: "Bring", pastParticiple: "Brought" },
  { spanish: "Construir", english: "Build", pastParticiple: "Built" },
  { spanish: "Comprar", english: "Buy", pastParticiple: "Bought" },
  { spanish: "Coger", english: "Catch", pastParticiple: "Caught" },
  { spanish: "Elegir", english: "Choose", pastParticiple: "Chosen" },
  { spanish: "Dibujar", english: "Draw", pastParticiple: "Drawn" },
  { spanish: "Conducir", english: "Drive", pastParticiple: "Driven" },
  { spanish: "Volar", english: "Fly", pastParticiple: "Flown" },
  { spanish: "Crecer", english: "Grow", pastParticiple: "Grown" },
  { spanish: "Esconder", english: "Hide", pastParticiple: "Hidden" },
  { spanish: "Perder", english: "Lose", pastParticiple: "Lost" },
  { spanish: "Significar", english: "Mean", pastParticiple: "Meant" },
  { spanish: "Equivocarse", english: "Mistake", pastParticiple: "Mistaken" },
  { spanish: "Volver a contar", english: "Retell", pastParticiple: "Retold" },
  { spanish: "Montar", english: "Ride", pastParticiple: "Ridden" },
  { spanish: "Sonar", english: "Ring", pastParticiple: "Rung" },
  { spanish: "Correr", english: "Run", pastParticiple: "Run" },
  { spanish: "Vender", english: "Sell", pastParticiple: "Sold" },
  { spanish: "Enviar", english: "Send", pastParticiple: "Sent" },
  { spanish: "Mostrar", english: "Show", pastParticiple: "Shown/Showed" },
  { spanish: "Cantar", english: "Sing", pastParticiple: "Sung" },
  { spanish: "Sentarse", english: "Sit", pastParticiple: "Sat" },
  { spanish: "Estar de pie", english: "Stand", pastParticiple: "Stood" },
  { spanish: "Nadar", english: "Swim", pastParticiple: "Swum" },
  { spanish: "Lanzar", english: "Throw", pastParticiple: "Thrown" },
  { spanish: "Entender", english: "Understand", pastParticiple: "Understood" },
  { spanish: "Llevar puesto", english: "Wear", pastParticiple: "Worn" },
  { spanish: "Ganar", english: "Win", pastParticiple: "Won" }
];

export default function App() {
  const [verbs, setVerbs] = useState([]);
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [verbEnglish, setVerbEnglish] = useState('');
  const [verbPastParticiple, setVerbPastParticiple] = useState('');
  const [result, setResult] = useState('');
  const [showStudy, setShowStudy] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [points, setPoints] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [canEarnPoints, setCanEarnPoints] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [showCorrectionEnglish, setShowCorrectionEnglish] = useState(false);
  const [showCorrectionParticiple, setShowCorrectionParticiple] = useState(false);
  const [canMoveToNextVerb, setCanMoveToNextVerb] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    saveMaxStreak();
  }, [maxStreak]);

  const checkLoginStatus = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        setUsername(userData.username);
        setPassword(userData.password);
        setPoints(userData.points);
        setMaxStreak(userData.maxStreak || 0);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const createUser = async () => {
    if (username.trim() === '') {
      Alert.alert('Error', 'El nombre de usuario es obligatorio');
      return;
    }

    try {
      const initialPoints = 15;
      const user = { username, points: initialPoints, maxStreak: 0 };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setPoints(initialPoints);
      setMaxStreak(0);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const saveMaxStreak = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        userData.maxStreak = maxStreak;
        userData.points = points;
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error saving max streak:', error);
    }
  };

  const selectVerbs = (type) => {
    if (type === 'regular') {
      setVerbs(regularVerbs);
    } else if (type === 'irregular') {
      setVerbs(irregularVerbs);
    } else if (type === 'both') {
      setVerbs(regularVerbs.concat(irregularVerbs));
    }
    setShowStudy(true);
    displayVerb();
    setCanEarnPoints(true);
    setCurrentStreak(0);
  };

  const displayVerb = () => {
    setVerbEnglish('');
    setVerbPastParticiple('');
    setResult('');
    setVerifying(false);
    setShowCorrectionEnglish(false);
    setShowCorrectionParticiple(false);
    setCanMoveToNextVerb(false);
  };

  const checkAnswer = () => {
    setVerifying(true);
  
    const verb = verbs[currentVerbIndex];
    const isCorrectEnglish = verbEnglish.trim().toLowerCase() === verb.english.toLowerCase();
    const isCorrectPastParticiple = verbPastParticiple.trim().toLowerCase() === verb.pastParticiple.toLowerCase();
  
    if (isCorrectEnglish && isCorrectPastParticiple) {
      setResult('¡Correcto!');
      setCurrentStreak(currentStreak + 1);
      if (currentStreak + 1 > maxStreak) {
        setMaxStreak(currentStreak + 1);
      }
      if (canEarnPoints) {
        setPoints(points + 5);
        setCanEarnPoints(false);
      }
    } else {
      setResult('Incorrecto');
      setCurrentStreak(0);
    }
  
    setCanMoveToNextVerb(true);
  
    setShowCorrectionEnglish(!isCorrectEnglish);
    setShowCorrectionParticiple(!isCorrectPastParticiple);
  };

  const nextVerb = () => {
    setCurrentVerbIndex((currentVerbIndex + 1) % verbs.length);
    displayVerb();
    setCanEarnPoints(true);
    setVerifying(false);
  };

  const skipVerb = () => {
    if (points >= 10) {
      setPoints(points - 10);
      setCurrentVerbIndex((currentVerbIndex + 1) % verbs.length);
      displayVerb();
      setCanEarnPoints(true);
      setVerifying(false);
    } else {
      Alert.alert('Error', 'No tienes suficientes puntos para saltar el verbo.');
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setPoints(0);
    setMaxStreak(0);
    AsyncStorage.removeItem('user');
  };

  const returnToMenu = () => {
    setShowStudy(false);
    setVerbs([]);
    setCanEarnPoints(true);
    setCanMoveToNextVerb(false);
    setCurrentStreak(0);
  };

  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Inicio de Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={createUser}>
          <Text style={styles.buttonText}>Crear Usuario</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
        <Text style={styles.footerText}>Code Three</Text>
      </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.header}>Bienvenido, {username}!</Text>
        <Text style={styles.points}>Puntos: {points}</Text>
        <View style={styles.streakContainer}>
          <Text style={styles.streakText}>Racha Actual: {currentStreak}</Text>
          <Text style={styles.streakTextMx}>Racha MX: {maxStreak}</Text>
        </View>
        <TouchableOpacity style={styles.smallButton} onPress={logout}>
          <Text style={styles.smallButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      {showStudy ? (
        <View style={styles.studyContainer}>
          <Text style={styles.label}>Verbo en Español: {verbs[currentVerbIndex].spanish}</Text>
          <TextInput
            style={[
              styles.input,
              showCorrectionEnglish ? styles.correctionInput : null,
              result === '¡Correcto!' ? styles.correctInput : null,
              verifying && !showCorrectionEnglish && !verbs[currentVerbIndex].english.toLowerCase().includes(verbEnglish.toLowerCase()) ? styles.wrongInput : null
            ]}
            placeholder="Verbo en Inglés"
            value={verbEnglish}
            onChangeText={setVerbEnglish}
            editable={!showCorrectionEnglish && !verifying}
          />
          {showCorrectionEnglish && (
            <Text style={styles.correctionText}>
              Respuesta correcta: {verbs[currentVerbIndex].english}
            </Text>
          )}
          <TextInput
            style={[
              styles.input,
              showCorrectionParticiple ? styles.correctionInput : null,
              result === '¡Correcto!' ? styles.correctInput : null,
              verifying && !showCorrectionParticiple && !verbs[currentVerbIndex].pastParticiple.toLowerCase().includes(verbPastParticiple.toLowerCase()) ? styles.wrongInput : null
            ]}
            placeholder="Participio Pasado"
            value={verbPastParticiple}
            onChangeText={setVerbPastParticiple}
            editable={!showCorrectionParticiple && !verifying}
          />
          {showCorrectionParticiple && (
            <Text style={styles.correctionText}>
              Respuesta correcta: {verbs[currentVerbIndex].pastParticiple}
            </Text>
          )}
          <TouchableOpacity style={styles.button} onPress={checkAnswer} disabled={verifying || canMoveToNextVerb}>
            <Text style={styles.buttonText}>Verificar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.skipButton]} onPress={skipVerb} disabled={points < 10 || verifying}>
            <Text style={styles.buttonText}>Saltar Verbo (-10 puntos)</Text>
          </TouchableOpacity>
          <Text style={styles.result}>{result}</Text>
          {canMoveToNextVerb && (
            <TouchableOpacity style={styles.button} onPress={nextVerb}>
              <Text style={styles.buttonText}>Siguiente Verbo</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.smallButton} onPress={returnToMenu}>
            <Text style={styles.smallButtonText}>Regresar al Menú</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.containerButton}>
          <Text style={styles.header}>Seleccione el tipo de verbos a estudiar:</Text>
          <TouchableOpacity style={styles.button} onPress={() => selectVerbs('regular')}>
            <Text style={styles.buttonText}>Verbos Regulares</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => selectVerbs('irregular')}>
            <Text style={styles.buttonText}>Verbos Irregulares</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => selectVerbs('both')}>
            <Text style={styles.buttonText}>Ambos</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Code Three</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7BDE2',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5D3F6A',
  },
  input: {
    height: 40,
    borderColor: '#5D3F6A',
    borderWidth: 1,
    marginTop: 5,
    padding: 10,
    borderRadius: 5,
    width: 200,
    backgroundColor: '#FFF',
  },
  containerButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5D3F6A',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  skipButton: {
    backgroundColor: '#FF6347',
  },
  smallButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D3F6A',
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  streakText: {
    fontSize: 14,
    color: '#5D3F6A',
  },
  streakTextMx: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5D3F6A',
  },
  studyContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#5D3F6A',
  },
  result: {
    fontSize: 18,
    marginVertical: 10,
    color: '#5D3F6A',
  },
  correctionLink: {
    color: '#5D3F6A',
    textDecorationLine: 'underline',
  },
  correctionInput: {
    backgroundColor: '#FFCCCC',
  },
  correctInput: {
    backgroundColor: '#90EE90',
  },
  wrongInput: {
    backgroundColor: '#F08080',
  },
  correctionText: {
    fontSize: 16,
    color: '#FF6347',
  },
  footer: {
    position: 'absolute',
    bottom: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#5D3F6A',
  },
});
