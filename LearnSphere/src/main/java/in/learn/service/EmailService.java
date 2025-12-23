package in.learn.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("LearnSphere - Password Reset OTP");
        message.setText(
            "Your OTP for password reset is: " + otp +
            "\n\nOTP is valid for 10 minutes.\n\nLearnSphere Team"
        );

        mailSender.send(message);
    }
}
