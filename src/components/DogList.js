import axios from "axios";
import React from "react";
class DogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dogs: {}, imgs: {}, value: "", matchedDogs: [] };
  }

  handleChange(e) {
    // on input change, find dogs that match the input
    const matches = [];
    Object.keys(this.state.dogs).forEach((dog) => {
      if (dog.match(e.target.value)) matches.push(dog);
    });

    this.setState({ value: e.target.value, matchedDogs: matches });
  }
  async componentDidMount() {
    // get API data on mount
    try {
      const res = await axios.get(`https://dog.ceo/api/breeds/list/all`);
      const dogs = res.data.message;
      this.setState({ dogs });
      this.fetchImg(dogs);
    } catch (e) {
      console.error("Something went wrong - ", e);
    }
  }
  async fetchImg(dogs) {
    // fetch images once dog list is complete
    const imgs = {};
    await Object.entries(dogs).forEach(async ([key]) => {
      try {
        const res = await axios.get(
          `https://dog.ceo/api/breed/${key}/images/random`
        );
        imgs[key] = res.data.message;
        this.setState({ imgs }); // i want to update state after the images have been recieved, this is WRONG
      } catch (e) {
        console.error("Something went wrong - ", e);
      }
    });
  }
  renderDogList() {
    // render images to matched dog list or show all dogs
    return Object.entries(this.state.imgs).map(([key, value]) => {
      if (
        this.state.matchedDogs.includes(key) ||
        this.state.matchedDogs.length === 0
      )
        return (
          <li key={key}>
            <img
              alt={`${key} dog picture`}
              title={`${key} dog`}
              src={value}
            ></img>
            <p className="breed">{key}</p>
          </li>
        );
    });
  }
  render() {
    return (
      <div className="dog-container">
        <h1> Woof Grid </h1>
        <div>
          <label htmlFor="filter">Filter:</label>
          <input
            name="fiter"
            type="text"
            value={this.state.value}
            onChange={(e) => {
              this.handleChange(e);
            }}
            // documentation says I don't need arrow function but I lose 'this' if I don't use arrow.
            placeholder="Search Dogs"
          ></input>
        </div>
        <ul className="dog-list">{this.renderDogList()}</ul>
      </div>
    );
  }
}

export default DogList;
