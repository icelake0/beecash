<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="assets/logo-filled.png" alt="Project logo"></a>
</p>

<h3 align="center">Beecash</h3>

---

<p align="center"> 
  Beecash is a NFC Payment management application, that provides a way to organize and manage all your NFC related payments in one place.
    <br> 
</p>

## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [🚀 Deployment ](#-deployment-)
- [⛏️ Built Using ](#️-built-using-)
- [✍️ Authors ](#️-authors-)

## 🧐 About <a name = "about"></a>

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
Minimum Node version [Node v18.17.0](https://nodejs.org/)
- clone repository
- Run yarn install
- For Native development
  - Run `yarn ios` or `yarn android`
  - For ios `cd ios` directory
  - Run `pod install` (Ensure you have `cocoapods` installed)

### Installing

A step by step series of examples that tell you how to get a development env running.

Say what the step will be

```bash
git clone {{repo}}
cd beecash
yarn install
```
To develop locally without using `Expo Go`
```bash
npx expo prebuild
cd ios
# Ensure you have cocoapods installed `brew install cocoapods`
pod install
cd ..
yarn start
```
**Note**:
`npx expo prebuild` generates an `ios` and `android` folder for local development
`yarn start` Starts `metro` bundler


## 🚀 Deployment <a name = "deployment"></a>
Deploy to Expo using EAS 
  For local deployment
  - `eas build --profile preview --platform all` (Build for ios & android)
  For Production deployment
  - `eas build -p all`

## ⛏️ Built Using <a name = "built_using"></a>
- [Expo](https://docs.expo.dev/)

## ✍️ Authors <a name = "authors"></a>

- [@icelake0](https://github.com/icelake0) - Collaboration & Maintenance 
