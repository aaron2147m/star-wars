const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const message = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method:'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing.'
          })
       })   
       
       .then(res => {
        if (res.ok) return res.json('Success')
      })
      .then(response => {
        window.location.reload(true)
        console.log(response)
    })
    
    
    
    
    })


    deleteButton.addEventListener('click', _ => {
      fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Darth Vader'
      })
  })
  .then(res =>{
    if (res.ok) return res.json()
  })
  .then(response => {
    if (response === 'No quote to delete') {
      message.textContent = 'No Darth Vader quote to delete'
    } else {
      window.location.reload(true)
    }
  })
  .catch()
   



    
  })




  
    