import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import { TeacherScreen } from "./Screens/TeacherScreen";
import { StudentScreen } from "./Screens/StudentScreen";
import { MarksScreen } from "./Screens/MarksScreen";

function App() {
  return (
    <Router>
      <main className="py-3 mx-3">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<StudentScreen />} />
            <Route path="/teachers" element={<TeacherScreen />} />
            <Route path="/marks" element={<MarksScreen />} />
            <Route path="/search/:keyword" element={<StudentScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
