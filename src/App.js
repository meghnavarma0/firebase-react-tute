import React, { Component } from 'react';
import firebase from './firebase';
import './App.css';

class App extends Component {
	state = {
		currentItem: '',
		username: '',
		items: []
	};
	componentDidMount() {
		const itemsRef = firebase.database().ref('items');
		itemsRef.on('value', snapshot => {
			let items = snapshot.val();

			let newState = [];
			for (let item in items) {
				newState.push({
					id: item,
					title: items[item].title,
					user: items[item].user
				});
			}
			this.setState({
				items: newState
			});
		});
	}
	onRemoveHandler = itemId => {
		const itemRef = firebase.database().ref(`/items/${itemId}`);
		itemRef.remove();
	};
	onChangeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	onSubmitHandler = e => {
		e.preventDefault();
		const itemsRef = firebase.database().ref('items');
		const item = {
			title: this.state.currentItem,
			user: this.state.username
		};
		itemsRef.push(item);
		this.setState({
			currentItem: '',
			username: ''
		});
	};

	render() {
		return (
			<div className='app'>
				<header>
					<div className='wrapper'>
						<h1>Fun Food Friends</h1>
					</div>
				</header>
				<div className='container'>
					<section className='add-item'>
						<form onSubmit={this.onSubmitHandler}>
							<input
								type='text'
								name='username'
								placeholder="What's your name?"
								onChange={this.onChangeHandler}
								value={this.state.username}
							/>
							<input
								type='text'
								name='currentItem'
								placeholder='What are you bringing?'
								onChange={this.onChangeHandler}
								value={this.state.currentItem}
							/>
							<button>Add Item</button>
						</form>
					</section>
					<section className='display-item'>
						<div className='wrapper'>
							<ul>
								{this.state.items.map(item => (
									<li key={item.id}>
										<h3>{item.title}</h3>
										<p>Brought by: {item.user}</p>
										<button
											onClick={() =>
												this.onRemoveHandler(item.id)
											}
										>
											Remove Item
										</button>
									</li>
								))}
							</ul>
						</div>
					</section>
				</div>
			</div>
		);
	}
}
export default App;
