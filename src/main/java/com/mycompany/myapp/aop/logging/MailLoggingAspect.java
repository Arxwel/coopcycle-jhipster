package com.mycompany.myapp.aop.logging;

import io.github.jhipster.config.JHipsterConstants;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;

import java.util.Arrays;

/**
 * Aspect for logging execution of service and repository Spring components.
 *
 * By default, it only runs with the "dev" profile.
 */
@Aspect
public class MailLoggingAspect {
    
    private final Environment env;

    public MailLoggingAspect(Environment env) {
        this.env = env;
    }

    /**
     * Retrieves the {@link Logger} associated to the given {@link JoinPoint}.
     *
     * @param joinPoint join point we want the logger for.
     * @return {@link Logger} associated to the given {@link JoinPoint}.
     */
    private Logger logger(JoinPoint joinPoint) {
        return LoggerFactory.getLogger(joinPoint.getSignature().getDeclaringTypeName());
    }

    @Pointcut("execution(* com.mycompany.myapp.service.MailService.send*(..))")
	public void sendEmail() {}
	
	@Around("sendEmail()")
	public void sendNewEmail(JoinPoint joinPoint){
        Logger log = logger(joinPoint);
        if (log.isDebugEnabled()) {
            log.debug("EnterMail: {}() with argument[s] = {}", joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));
        }
        try {
            if (log.isDebugEnabled()) {
                log.debug("ExitMail: {}()", joinPoint.getSignature().getName());
            }
        } catch (IllegalArgumentException e) {
            log.error("Illegal argument: {} in {}()", Arrays.toString(joinPoint.getArgs()), joinPoint.getSignature().getName());
            throw e;
        }
	}
}
