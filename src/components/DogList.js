import axios from "axios";
import React from "react";
class DogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dogs: {}, imgs: {}, value: "", matchedDogs: [] };
  }

  handleChange(e) {
    const matches = [];
    Object.keys(this.state.dogs).forEach((dog) => {
      if (dog.match(e.target.value)) matches.push(dog);
    });

    this.setState({ value: e.target.value, matchedDogs: matches });
  }
  async componentDidMount() {
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
    const imgs = {};
    await Object.entries(dogs).forEach(async ([key]) => {
      try {
        const res = await axios.get(
          `https://dog.ceo/api/breed/${key}/images/random`
        );
        imgs[key] = res.data.message;
        this.setState({ imgs }); // i want to update state after the images have been recieved
      } catch (e) {
        console.error("Something went wrong - ", e);
      }
    });
  }
  renderDogList() {
    return Object.entries(this.state.imgs).map(([key, value]) => {
      if (
        this.state.matchedDogs.includes(key) ||
        this.state.matchedDogs.length === 0
      )
        return (
          <li key={key}>
            <img alt={value} src={value}></img>
            <p className="breed">{key}</p>
          </li>
        );
    });
  }
  render() {
    return (
      <div>
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
            // documentation says i dont need an arrow function
            placeholder="Search Dogs"
          ></input>
        </div>
        <ul className="dog-list">{this.renderDogList()}</ul>
      </div>
    );
  }
}

export default DogList;
