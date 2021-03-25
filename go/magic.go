package main

import (
	"fmt"
	"os/exec"
	"net"
 	"net/http"
 	"time"
)

func main() {
	listener, _ := net.Listen("tcp", ":0")
	port := listener.Addr().(*net.TCPAddr).Port
	url := fmt.Sprint("http://localhost:", port)
	// Create handler
	http.Handle("/", http.FileServer(http.Dir("./")))
	go func() {
		time.Sleep(time.Second)
		exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	}()
	http.Serve(listener, nil)
}