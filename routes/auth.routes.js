const { Router } = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const config = require("config")
const User = require("../models/User")

const { check, validationResult } = require("express-validator")

const router = Router()

// /api/auth/register
router.post(
    "/register",
    // middleware для валидации полей body
    [
        check("email", "Invalid email").isEmail(),
        check("password", "Min lenght of password 5 symbols").isLength({ min: 5 }),
    ],
    async (request, response) => {
        try {
            //      await User.deleteMany({}) !!!удалить всех пользователей
            // результат валидации
            const errors = validationResult(request)
            //если не пустой возвращаем ошибкуdfdfd
            if (!errors.isEmpty()) {
                return response
                    .status(400)
                    .json({ errors: errors.array(), message: "Invalid register data" })
            }

            const { email, password } = request.body
            // проверяем есть ли уже пользователь с таким логином в БД
            const candidate = await User.findOne({ email })
            // если такой юзер уже есть возвращаем ошибку и сообщение
            if (candidate) {
                return response
                    .status(400)
                    .json({ message: "Email is busy by another user" })
            }
            // хешируем пароль
            const hashedPassword = await bcrypt.hash(password, 12)
            //создаем новую модель пользователя для БД
            const user = new User({ email, password: hashedPassword })
            // сохраняем в БД
            await user.save()

            /// TEMP
            console.log(`REGISTER user: ${email}`)
            /// TEMP

            response.status(201).json({ message: "New user created" })
        } catch (error) {
            response.status(500).json({ message: "Something wrong" })
        }
    }
)
// /api/auth/login
router.post(
    "/login",
    [
        check("email", "Invalid email").normalizeEmail().isEmail(),
        check("password", "Field required").exists(),
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response
                    .status(400)
                    .json({ errors: errors.array(), message: "Invalid login data" })
            }
            const { email, password } = request.body

            const user = await User.findOne({ email })

            // если такого пользователя нету, возвращаем ошибку
            if (!user) {
                console.log("user not found: ", user)

                return response.status(400).json({ message: "User not found" })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return response.status(400).json({ message: "Wrong password" })
            }

            const langs =
                user.langs.from !== null
                    ? { from: user.langs.from || "ru", to: user.langs.to || "en" }
                    : null

            const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
                expiresIn: "2h",
            })
            /// TEMP
            console.log(`LOGIN user: ${email}`)
            console.log("langs: ", langs)
            /// TEMP
            response.json({ token, userId: user.id, langs })
        } catch (error) {
            response.status(500).json({ message: "Something wrong" })
        }
    }
)

module.exports = router
