package main
import (
	"fmt"
	"github.com/google/uuid"
	"github.com/gogo/go-example/gogo"
)
func main(){
 id := uuid.New()
  fmt.Printf("Generated UUID: %s\n", id)
  gogo.SayTest()
}                                                                               