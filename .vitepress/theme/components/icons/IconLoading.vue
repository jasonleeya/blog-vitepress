<template>
  <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg" width="800" height="160">
    <defs>
      <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="5%" stop-color="#42b883"/>
        <stop offset="95%" stop-color="#35495E"/>
      </linearGradient>
      <pattern id="wave" x="0" y="0" width="120" height="20" patternUnits="userSpaceOnUse">
        <path id="wavePath" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z"  fill="url(#gradient)">
          <animateTransform
              attributeName="transform"
              begin="0s"
              dur="1.5s"
              type="translate"
              from="0,0"
              to="40,0"
              repeatCount="indefinite" />
        </path>
      </pattern>
    </defs>
    <text text-anchor="middle" x="50" y="15" font-size="17" fill="url(#wave)"  fill-opacity="0.8">LOADING</text>
    <text text-anchor="middle" x="50" y="15" font-size="17" fill="url(#gradient)" fill-opacity="0.2">LOADING</text>
  </svg>
</template>
