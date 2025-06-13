package main
import (
	"fmt"
	"log"
	"net/http"
  "encoding/json"
)

type User struct{
  ID int `json:id`
  Name string `json:"name"`

}

var users= []User{
	{ID: 1, Name: "Alice"},
	{ID: 2, Name: "Bob"},
}

func userHandler(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(users)
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	newUser.ID = len(users) + 1
	users = append(users, newUser)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newUser)
}


func helloHandler(w http.ResponseWriter, r *http.Request) {
  if r.URL.Path != "/hello" {
    http.Error(w, "404 not found.", http.StatusNotFound)
    return
  }

  if r.Method != "GET" {
    http.Error(w, "Method is not supported.", http.StatusNotFound)
    return
  }

  fmt.Fprintf(w, "Hello World!")
}

func main() {
  http.HandleFunc("/hello", helloHandler)

  fmt.Printf("Starting server at port 3030\n")
  if err := http.ListenAndServe(":3030", nil); err != nil {
    log.Fatal(err)
  }
}