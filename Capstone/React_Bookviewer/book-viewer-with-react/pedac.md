Your task is to create a React application that interacts with the Sherlock Holmes API. Focus on implementing the following core functionality:

Components:
TOC is a component, contains many ChapterLinks components
each takes a title and an onSelect

chapter contents component - even though it's just text

Main is a component
Conditional for if a chapter is given, else TOC
for chapter given, title and contents
for TOC, book title


1. Fetch the table of contents from the API when the application loads.
   - Make a call using `fetch` or axois to fetch the data
     - this involved a nightmare 2 hours with cors and then eventually putting some server script in the vite.config.ts

2. Display the list of chapters from the table of contents.
   - loop through the array of the chapters, listing each one as its own paragraph or anchor
   - 

3. Implement a way for users to select a chapter (e.g., by clicking on its title).
   - each anchor gets a handler to request the text of the chapter and replace the TOC with the chapter text
   - 
   - how to replace the TOC with the body? Just rerender? 
     - Use state for the main body of the page, and when the state is updated it will rerender
   - 

4. When a chapter is selected, fetch its content from the API.
   - ok so another useEffect or the same one? 
   - but some useeffect will call the chapter api

5. Display the fetched chapter content to the user.
   - so displaying the content is the useState, right, because when the state is updated the page rerenders
   - not sure if the same state should hold the TOC and a chapter?

6. Ensure the user can easily switch between viewing the table of contents and reading a specific chapter.
   - a button to render the TOC from each chapter layout, the handler gets the TOC again (though it could just hold the
   TOC data from the first render, since the TOC never changes? And then we wouldn't have to call the API as many times?

