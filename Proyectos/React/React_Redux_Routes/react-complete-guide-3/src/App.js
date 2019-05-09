import React, { Component } from "react";
import Person from "./Person/Person";
import "./App.css";

class App extends Component {
   state = {
      persons: [
         { id: '0', name: 'Ruben', age: '25' },
         { id: '1', name: 'Manu', age: '26' },
         { id: '2', name: 'Tania', age: '24' }
      ],
      otherState: 'Some value',
      showPersons: false
   }

   nameChangedHandler = (event, id) => {
      const personIndex = this.state.persons.findIndex(p => {
         return p.id === id;
      });

      const person = {...this.state.persons[personIndex]}; 
      // const person = Object.assign({}, this.state.persons[personIndex])

      person.name = event.target.value;
      const persons = [...this.state.persons];

      persons[personIndex] = person;

      this.setState({ persons: persons })
   }

   deletePersonHandler = (personIndex) => {
      const persons = [...this.state.persons];
      persons.splice(personIndex, 1); 
      this.setState({ persons: persons })
   }

   tooglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({ showPersons: !doesShow })
   }

   render(){
      const buttonStyle = {
         backgroundColor: 'green',
         color: 'white',
         font: 'inherit',
         border: '1x solid blue',
         padding: '8px',
         cursor: 'pointer'
      };

      let persons = null; 
      const show = this.state.showPersons;

      if (show) {
         persons = (
            <div>
               {this.state.persons.map((person, index) => {
                  return (
                     <Person 
                        key={person.id}
                        name={person.name}  
                        age={person.age}
                        changed={(event) => this.nameChangedHandler(event, person.id)}
                        click={() => this.deletePersonHandler(index)}
                     />
                  );
               })}
            </div>
         );

         buttonStyle.backgroundColor = 'red'
      }

      let classes = [];
      if(this.state.persons.length <= 2) classes.push('red'); // classes = ['red']
      if(this.state.persons.length <= 1) classes.push('bold'); // classes = ['red', 'bold']

      return (
         <div className="App">
            <h1>Hi, I'm Ruben</h1>
            <p className={classes.join(' ')}>And I'm the f*cking boss</p>
            <button style={buttonStyle} onClick={this.tooglePersonsHandler}>Toggle persons</button>
            {persons}
         </div>
      )
   }
}


export default App;





