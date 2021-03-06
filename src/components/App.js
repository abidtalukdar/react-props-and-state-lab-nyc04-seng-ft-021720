import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
    state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

    fetchPets = (event) => {
        console.log(event) // you can also access the event with this because callbacks on events always pass the event as an argument unless told otherwise, but there is no use of the event 
        let petsURL = '/api/pets';

        if (this.state.filters.type !== 'all') {
            petsURL += `?type=${this.state.filters.type}`
        }

        fetch(petsURL)
        .then(response => response.json())
        .then(pets => this.setState({ pets: pets }))
    }

    onChangeType = (event) => {
        this.setState({
            filters: { type: event.target.value } 
        }, () => console.log(this.state))
    }

    onAdoptPet = (petID) => {
        const pets = this.state.pets.map(pet => {
            return pet.id === petID ? {...pet, isAdopted: true} : pet;
        })
        this.setState({ pets: pets });
    }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={this.onChangeType} 
                onFindPetsClick={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
