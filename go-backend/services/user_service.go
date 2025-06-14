package services

import (
	"github.com/yourname/go-clean-api/models"
)

var users = []models.User{
	{ID: 1, Name: "Alice"},
	{ID: 2, Name: "Bob"},
}
func getAllUsers() []models.User {
	return users
}

func getUserByID(id int) (*models.User, bool){
	for _, u := range users{
		if u.ID == id{
			return &u, true
		}
	}
	return nil, false
} 

func UpdateUser(id int, name string) (*models.User, bool) {
	for i, u := range users {
		if u.ID == id {
			users[i].Name = name
			return &users[i], true
		}
	}
	return nil, false
}

func DeleteUser(id int) bool {
	for i, u := range users {
		if u.ID == id {
			users = append(users[:i], users[i+1:]...)
			return true
		}
	}
	return false
}