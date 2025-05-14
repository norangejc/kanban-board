import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{

    --white:#fff;
    --red:rgb(157, 0, 0); 
    --violet: #413c58;
    --night: #2e293d;
    --ash-gray: #a3c4bc;
    --tea-green:#bfd7b5;
    --cream: #e7efc5;
    --asparagus: #63924F;
    
    --border-radius-s: 7px;
    --border-radius-m: 8px;
    --border-radius-l: 20px;
    

   --green-shadow:rgb(78, 114, 63, 0.6);

}
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: background-color 0.3s, border 0.3s;
}
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--night);
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 18px;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  cursor: not-allowed;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--tea-green);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}
`;
export default GlobalStyles;
