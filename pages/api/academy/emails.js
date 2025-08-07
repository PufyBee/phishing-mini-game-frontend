// pages/api/academy/emails.js
export default function handler(req, res) {
    const { level } = req.query
    // Simple seed per level; in real backend you’d pull from DB
    const samples = {
        easy: [
            { id: 1, sender: 'admin@bank.com', subject: 'Verify your account', snippet: 'Click here to update…', isPhish: true },
            { id: 2, sender: 'newsletter@shopping.com', subject: 'Your weekly deals', snippet: 'Check out our latest offers', isPhish: false },
            { id: 3, sender: 'security@service.com', subject: 'Password reset', snippet: 'We detected a login…', isPhish: true },
            { id: 4, sender: 'friend@example.com', subject: 'Lunch tomorrow?', snippet: 'Hey, want to grab…', isPhish: false },
            { id: 5, sender: 'alerts@store.com', subject: 'Order shipped!', snippet: 'Your package is on the way', isPhish: false },
        ],
        medium: [ /* add 10 items */],
        hard: [ /* add 15 items */],
    }
    res.status(200).json(samples[level] || samples.easy)
}
