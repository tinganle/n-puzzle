# N-Puzzle

N-puzzle is a sliding puzzle that consists of a frame of numbered square tiles in random order with one tile missing. The goal is to place the tiles in order by making sliding moves that use the empty space.  See more details about N-Puzzle on wikipedia https://en.wikipedia.org/wiki/15_puzzle.   

This repository contains source code for an ionic/Angular implementation of N-Puzzle. 

## To play a live game on GitHub page
https://tinganle.github.io/n-puzzle/home

## To deploy as a GitHub page

ionic build --prod  -- --output-path docs --base-href /n-puzzle/ 

mv docs/index.html docs/404.html
