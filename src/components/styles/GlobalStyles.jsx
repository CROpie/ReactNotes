import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
picture,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

:root {
  --radius: 0.5rem;
  --sidebar-width: 20rem;
  --header-height: 3rem;

  /* colours */
    --dark-grey: 248 10% 15%;
    --grey: 251 9% 53%;
    --white: 252 11% 91%;
    /* --black: 248 15% 11%; */
    --green: 127 100% 82%;
    --red: 0 91% 63%;
    --orange: 13 95% 66%;
    --yellow: 42 91% 68%;
    /* --black: 0 0% 0%; */
    --black: 0 0% 5%;

    --code-bg: 243 33% 25%;
   


   /* --purple: 250 100% 82%; */
   --purple: 264 100% 64%;

    --text-color: hsl(var(--white));
    --content-bg: hsl(var(--dark-grey));
    --primary: hsl(var(--green));
    --primary-hover: hsl(var(--green)/0.75);
    --highlight: hsl(var(--purple));


/* typography */

}


*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

img,
svg {
  display: block;
  height: 100%;
}

html,
body,
#root {
  height: 100%;
}

body {
  background: hsl(var(--black));
  color: hsl(var(--white));
  font-family: JetBrains;
  font-weight: 500;

  &::-webkit-scrollbar {
    display: none;
  }
}

#root {
  isolation: isolate;
  /* font-family: Ubuntu;
  font-weight: 400; */
}

a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

a:visited {
  color: #4949ff;
}

input, select, button {
  font-family: inherit;
    font-size: 1rem;
}

input {
  width: 100%;
}

button {
  display: block;
  border: none;
  cursor: pointer;
  outline: none;


  background: transparent;
}



`
